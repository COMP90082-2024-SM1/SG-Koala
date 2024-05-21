import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import Calendar from '../../pages/Calendar';
import { getAllBooking } from "../../api/DashbaordAPI";

jest.mock("../../api/DashbaordAPI");

describe('Calendar interactions on specific date', () => {
    beforeEach(() => {
        getAllBooking.mockResolvedValue([
            {
                id: "1",
                name: "Event1",
                date: "2024-05-10T12:00:00Z",
                startTime: "2024-05-10T14:00:00Z",
                endTime: "2024-05-10T15:00:00Z",
                location: "Room A"
            },
            {
                id: "2",
                name: "Event2",
                date: "2024-05-10T16:00:00Z",
                startTime: "2024-05-10T17:00:00Z",
                endTime: "2024-05-10T18:00:00Z",
                location: "Room B"
            },
            {
                id: "3",
                name: "Event3",
                date: "2024-05-10T17:00:00Z",
                startTime: "2024-05-10T18:00:00Z",
                endTime: "2024-05-10T19:00:00Z",
                location: "Room C"
            }
        ]);
    });

    test('Verify that calendar loads correctly', async () => {
        render(<Calendar />);

        // Ensure that the component has rendered something indicative of completed load
        await screen.findByText('10', { timeout: 5000 }); // Adjust timeout based on expected load time

        // Check if the specific date cell for "10 May 2024" is rendered
        const dateCell = await screen.findByRole('gridcell', { name: '10 May 2024' });
        expect(dateCell).toBeInTheDocument(); // Verifies that the date cell is present

    });
});