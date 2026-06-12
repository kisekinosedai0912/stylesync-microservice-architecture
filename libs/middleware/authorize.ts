import { Request, Response, NextFunction } from "express";
import { Role } from "@stylesync/types";

export function authorizeRoles(...allowedRoles: Role[]) {
	return (req: Request, res: Response, next: NextFunction): void => {
		if (!req.user || !req.user.tbl_roles) {
			res.status(403).json({
				message: "Forbidden: User has no role assigned.",
			});
			return;
		}

		if (!allowedRoles.includes(req.user.tbl_roles.role)) {
			res.status(403).json({
				message:
					"Forbidden: You do not have the required role to access this resource.",
			});
			return;
		}
		next();
	};
}
