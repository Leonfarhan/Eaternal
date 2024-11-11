import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
    data: any[];
    xKey: string;
    yKey: string;
}

export function LineChart({ data, xKey, yKey }: LineChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={xKey}
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey={yKey}
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: '#2563eb', strokeWidth: 2 }}
                    connectNulls={true}
                />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}