import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransportRoutePoint extends Document { route: string; pickupPoints: string[]; }
const TransportRoutePointSchema = new Schema({ route: { type: String, required: true }, pickupPoints: { type: [String], default: [] } });
export const TransportRoutePoint = mongoose.models.TransportRoutePoint || mongoose.model<ITransportRoutePoint>("TransportRoutePoint", TransportRoutePointSchema);

export interface ITransportAssignVehicle extends Document { route: string; vehicle: string; }
const TransportAssignVehicleSchema = new Schema({ route: { type: String, required: true }, vehicle: { type: String, required: true } });
export const TransportAssignVehicle = mongoose.models.TransportAssignVehicle || mongoose.model<ITransportAssignVehicle>("TransportAssignVehicle", TransportAssignVehicleSchema);

export interface ITransportFeesMaster extends Document { route: string; amount: number; }
const TransportFeesMasterSchema = new Schema({ route: { type: String, required: true }, amount: { type: Number, required: true } });
export const TransportFeesMaster = mongoose.models.TransportFeesMaster || mongoose.model<ITransportFeesMaster>("TransportFeesMaster", TransportFeesMasterSchema);
