import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import './AppointmentChart.css';

const appointmentData = [
    { day: 'Monday', appointments: 20 },
    { day: 'Tuesday', appointments: 35 },
    { day: 'Wednesday', appointments: 25 },
    { day: 'Thursday', appointments: 45 },
    { day: 'Friday', appointments: 30 },
    { day: 'Saturday', appointments: 50 },
    { day: 'Sunday', appointments: 15 }
];

function AppointmentChart() {

    return (

        <div className="appointment-chart">

            <h2>Weekly Appointments</h2>

            <ResponsiveContainer width="100%" height={300}>

                <BarChart data={appointmentData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="appointments"
                        fill="#14213d"
                        radius={[5, 5, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default AppointmentChart;