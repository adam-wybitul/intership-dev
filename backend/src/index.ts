import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import {BusinessCase, BusinessCaseResponse} from './types';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data endpoint
app.get('/api/hello', (req, res) => {
    try {
        const dataPath = path.join(process.cwd(), '../data/data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const jsonData: BusinessCaseResponse = JSON.parse(rawData);

        const dataRows = jsonData.data.slice(0, 5).map((item: BusinessCase) => ({
            id: item.id,
            name: item.name,
            code: item.code,
            type: item._entityName
        }));

        res.json({
            message: 'Hello World from Raynet API!',
            timestamp: new Date().toISOString(),
            status: 'ok',
            dataRows
        });
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({
            message: 'Error reading data',
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Sales dashboard endpoint
app.get('/api/sales-dashboard', (req, res) => {
    try {
        const dataPath = path.join(process.cwd(), '../data/data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const jsonData: BusinessCaseResponse = JSON.parse(rawData);

        const period = req.query.period as string | undefined;
        let filteredDeals = jsonData.data;

        if (period) {
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth();

            filteredDeals = filteredDeals.filter((deal: BusinessCase) => {
                const dealDateStr = deal.validFrom || deal['rowInfo.createdAt'];
                if (!dealDateStr) return false;

                const dealDate = new Date(dealDateStr);
                const dealYear = dealDate.getFullYear();
                const dealMonth = dealDate.getMonth();

                if (period === 'thisMonth') {
                    return dealYear === currentYear && dealMonth === currentMonth;
                } else if (period === 'lastMonth') {
                    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
                    return dealYear === lastMonthYear && dealMonth === lastMonth;
                } else if (period === 'thisYear') {
                    return dealYear === currentYear;
                }

                return true;
            });
        }

        const deals = filteredDeals.slice(0, 300);
        const statsPerPerson: Record<string, { totalDeals: number; totalAmount: number }> = {};
        deals.forEach((deal: BusinessCase) => {
            const ownerName = deal.owner.fullName;
            if (!statsPerPerson[ownerName]) {
                statsPerPerson[ownerName] = {totalDeals: 0, totalAmount: 0};
            }
            statsPerPerson[ownerName].totalDeals++;
            statsPerPerson[ownerName].totalAmount += deal.totalAmount || 0;
        });

        const sortedData = Object.keys(statsPerPerson).map(name => ({
            name,
            totalDeals: statsPerPerson[name].totalDeals,
            totalAmount: statsPerPerson[name].totalAmount,
            trend: 0
        })).sort((a, b) => b.totalAmount - a.totalAmount);

        const data = sortedData.map((item, index) => ({
            id: index + 1,
            ...item
        }));

        res.json({
            status: 'ok',
            data
        });
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({
            message: 'Error reading data',
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server běží na http://localhost:${PORT}`);
    console.log(`📋 API dostupné na http://localhost:${PORT}/api/hello`);
});

export default app;
