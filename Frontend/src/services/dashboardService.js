import api from "./api";

const getDashboardData = async () => {
    const response = await api.get("/api/admin/dashboard/");
    return response.data;
};

const dashboardService = {
    getDashboardData,
};

export default dashboardService;
