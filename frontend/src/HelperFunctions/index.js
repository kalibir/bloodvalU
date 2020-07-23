export const bloodGroupTest = (bloodgroup, request) => {
    if (bloodgroup === "O-") return true;
    if (bloodgroup === "O+" && ["O+", "A+", "B+", "AB+"].includes(request.blood_group)) return true;
    if (bloodgroup === "A-" && ["A-", "A+", "AB-", "AB+"].includes(request.blood_group)) return true;
    if (bloodgroup === "A+" && ["A+", "AB+"].includes(request.blood_group)) return true;
    if (bloodgroup === "B-" && ["B-", "B+", "AB-", "AB+"].includes(request.blood_group)) return true;
    if (bloodgroup === "B+" && ["B+", "AB+"].includes(request.blood_group)) return true;
    if (bloodgroup === "AB-" && ["AB-", "AB+"].includes(request.blood_group)) return true;
    if (bloodgroup === "AB+" && "AB+" === request.blood_group) return true;
    return false;
}