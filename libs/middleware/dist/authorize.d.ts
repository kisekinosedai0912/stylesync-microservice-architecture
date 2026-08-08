import { Request, Response, NextFunction } from "express";
import { Role } from "@stylesync/types";
export declare function authorizeRoles(...allowedRoles: Role[]): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorize.d.ts.map