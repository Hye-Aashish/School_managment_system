export const CLASSES = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

export const SECTIONS = ["A", "B", "C", "D", "E"];

export const GENDERS = ["Male", "Female", "Other"];

export const CATEGORIES = ["General", "OBC", "SC", "ST"];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const STUDENT_HOUSES = ["Red", "Blue", "Green", "Yellow"];

export const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];

export interface Student {
    admission_no: string;
    roll_no: string;
    class: string;
    section: string;
    fname: string;
    lname: string;
    gender: string;
    dob: string;
    category: string;
    religion: string;
    caste: string;
    mobile: string;
    email: string;
    admission_date: string;
    blood_group: string;
    student_house: string;
    father_name: string;
    father_phone: string;
    father_email?: string;
    father_occupation?: string;
    mother_name?: string;
    mother_phone?: string;
    mother_email?: string;
    mother_occupation?: string;
    status: string;
    height?: string;
    weight?: string;
    as_on_date?: string;
    medical_history?: string;
    photo?: string;
    sibling_admission_no?: string;
}

export interface OnlineAdmission {
    reference_no: string;
    fname: string;
    lname: string;
    class: string;
    section: string;
    father_name: string;
    dob: string;
    gender: string;
    category: string;
    mobile: string;
    form_status: "Submitted" | "Not Submitted";
    payment_status: "Paid" | "Unpaid";
    created_at: string;
}
