import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransportRoute extends Document { name: string; }
const TransportRouteSchema = new Schema({ name: { type: String, required: true } });
export const TransportRoute = mongoose.models.TransportRoute || mongoose.model<ITransportRoute>("TransportRoute", TransportRouteSchema);

export interface ITransportVehicle extends Document {
    vehicleNo: string;
    model: string;
    yearMade: string;
    registrationNo: string;
    driverName: string;
    driverLicence: string;
    driverPhone: string;
}
const TransportVehicleSchema = new Schema({
    vehicleNo: { type: String, required: true },
    model: { type: String },
    yearMade: { type: String },
    registrationNo: { type: String },
    driverName: { type: String },
    driverLicence: { type: String },
    driverPhone: { type: String }
});
export const TransportVehicle = mongoose.models.TransportVehicle || mongoose.model<ITransportVehicle>("TransportVehicle", TransportVehicleSchema);

export interface ITransportPickupPoint extends Document { name: string; latitude: string; longitude: string; }
const TransportPickupPointSchema = new Schema({ name: { type: String, required: true }, latitude: { type: String }, longitude: { type: String } });
export const TransportPickupPoint = mongoose.models.TransportPickupPoint || mongoose.model<ITransportPickupPoint>("TransportPickupPoint", TransportPickupPointSchema);
