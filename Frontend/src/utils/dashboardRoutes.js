const dashboardRoutes = {
    ADMIN: "/admin/dashboard",
    DOCTOR: "/doctor/dashboard",
    STAFF: "/staff/dashboard",
    PATIENT: "/patient/dashboard",
};

export function getDashboardRoute(role) {
    if (typeof role !== "string") {
        return null;
    }

    return dashboardRoutes[role.trim().toUpperCase()] ?? null;
}
