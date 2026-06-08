import {
	pgTable,
	text,
	timestamp,
	pgEnum,
	integer,
	index,
	boolean,
	varchar,
	decimal,
	uuid,
} from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

// uuid v7 primary key generation
const pk = () =>
	uuid("id")
		.primaryKey()
		.$defaultFn(() => uuidv7());

const money = (name: string) => decimal(name, { precision: 10, scale: 2 });

// ---------- users/auth --------------

const roleEnum = pgEnum("role", ["admin", "staff"]);

export const roles = pgTable("tbl_roles", {
	id: pk(),
	role: roleEnum("role").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("tbl_users", {
	id: pk(),
	username: varchar("username", { length: 255 }).notNull(),
	password: text("password").notNull(),
	email: varchar("email", { length: 255 }).unique().notNull(),
	fullname: varchar("fullname", { length: 255 }).notNull(),
	roleId: uuid("role_id").references(() => roles.id, {
		onDelete: "cascade",
	}),
	lastLogin: timestamp("last_login"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at"),
});

// ---------- bookings --------------

export const customer = pgTable("tbl_customer", {
	id: pk(),
	customerName: varchar("customer_name", { length: 255 }).notNull(),
	phoneNum: varchar("phone_num", { length: 20 }),
	email: varchar("email", { length: 255 }).unique().notNull(),
	notes: text("notes"),
	createdAt: timestamp("created_at").defaultNow(),
});

const bookingStatusEnum = pgEnum("booking_status", [
	"pending",
	"confirmed",
	"rejected",
]);

export const bookings = pgTable(
	"tbl_bookings",
	{
		id: pk(),
		refCode: varchar("reference_code", { length: 255 }).unique().notNull(),
		customerId: uuid("customer_id").references(() => customer.id, {
			onDelete: "cascade",
		}),
		// soft ref -> users (auth-service); name snapshotted for history
		staffId: uuid("staff_id").notNull(),
		staffName: varchar("staff_name", { length: 255 }),
		// soft ref -> services table; name/price snapshotted for history
		serviceId: uuid("service_id").notNull(),
		serviceName: varchar("service_name", { length: 255 }),
		priceSnapshot: money("price_snapshot"),
		schedTime: timestamp("scheduled_time").notNull(),
		status: bookingStatusEnum("status").notNull().default("pending"),
		isVerified: boolean("is_verified").default(false),
		createdAt: timestamp("created_at").defaultNow(),
		updatedAt: timestamp("updated_at"),
	},
	(t) => [
		index("idx_bookings_customer").on(t.customerId),
		index("idx_bookings_staff").on(t.staffId),
		index("idx_bookings_service").on(t.serviceId),
		index("idx_bookings_sched").on(t.schedTime),
	],
);

// ---------- services --------------

export const category = pgTable("tbl_category", {
	id: pk(),
	category: varchar("category", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("tbl_services", {
	id: pk(),
	package: varchar("package", { length: 255 }).notNull(),
	categoryId: uuid("category_id").references(() => category.id, {
		onDelete: "cascade",
	}),
	priceRange: money("price_range").notNull(),
	approxTime: varchar("approximate_time", { length: 255 }),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at"),
});

// ---------- notification --------------

const notifTypeEnum = pgEnum("notif_type", [
	"booking_created",
	"booking_verification",
	"booking_confirmed",
	"booking_rejected",
]);
const notifStatusEnum = pgEnum("notif_status", ["queued", "sent", "failed"]);

export const notification = pgTable(
	"tbl_notification",
	{
		id: pk(),
		sentTo: varchar("sent_to", { length: 255 }).notNull(),
		recipientName: varchar("recipient_name", { length: 255 }),
		type: notifTypeEnum("type").notNull(),
		// soft refs -> booking-service
		customerId: uuid("customer_id"),
		bookingId: uuid("booking_id"),
		subject: varchar("subject", { length: 255 }),
		body: text("body"),
		status: notifStatusEnum("status").notNull().default("queued"),
		providerMessageId: varchar("provider_message_id", { length: 255 }), // returned by Resend
		error: text("error"),
		sentAt: timestamp("sent_at"),
		createdAt: timestamp("created_at").defaultNow(),
	},
	(t) => [
		index("idx_notif_booking").on(t.bookingId),
		index("idx_notif_customer").on(t.customerId),
	],
);

// ---------- inventory --------------

const inventoryStatusEnum = pgEnum("inventory_status", [
	"low stocks",
	"high stocks",
]);

export const inventory = pgTable("tbl_inventory", {
	id: pk(),
	productName: varchar("product_name", { length: 255 }).notNull(),
	stocks: integer("stocks").notNull().default(0),
	status: inventoryStatusEnum("status").notNull(),
	variant: varchar("variant", { length: 255 }),
	stockId: varchar("stock_id", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at"),
});

export const products = pgTable("tbl_products", {
	id: pk(),
	inventoryId: uuid("inventory_id").references(() => inventory.id, {
		onDelete: "cascade",
	}),
	price: money("price").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at"),
});

// ---------- transactions --------------

const typeEnum = pgEnum("transaction_type", ["walkin", "booking", "pos"]);

export const transactions = pgTable(
	"tbl_transactions",
	{
		id: pk(),
		salesRef: varchar("sales_reference", { length: 255 })
			.unique()
			.notNull(),
		type: typeEnum("type").notNull(),
		// soft ref -> bookings (set when type = booking)
		bookingId: uuid("booking_id"),
		// soft ref -> users (set when type = walkin | pos)
		soldById: uuid("sold_by_staff_id"),
		soldByName: varchar("sold_by_staff_name", { length: 255 }),
		subTotal: money("subtotal").notNull(),
		tax: money("tax").default("0"),
		total: money("total").notNull(),
		purchasedAt: timestamp("purchased_at").defaultNow(),
	},
	(t) => [
		index("idx_txn_soldby").on(t.soldById),
		index("idx_txn_booking").on(t.bookingId),
	],
);

export const transactionItems = pgTable(
	"tbl_transaction_items",
	{
		id: pk(),
		transactionId: uuid("transaction_id").references(
			() => transactions.id,
			{ onDelete: "cascade" },
		),
		// soft ref -> products (inventory-service); name/price snapshotted
		productId: uuid("product_id"),
		productName: varchar("product_name", { length: 255 }),
		unitPrice: money("unit_price").notNull(),
		quantity: integer("quantity").notNull(),
		createdAt: timestamp("created_at").defaultNow(),
	},
	(t) => [
		index("idx_txnitem_txn").on(t.transactionId),
		index("idx_txnitem_product").on(t.productId),
	],
);
