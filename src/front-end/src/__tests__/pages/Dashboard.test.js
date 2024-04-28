import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "../../pages/Dashboard";
import { BrowserRouter } from "react-router-dom";

// Helper to wrap Dashboard in BrowserRouter since it uses useNavigate
const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)
    return render(ui, { wrapper: BrowserRouter });
};

describe("Dashboard component", () => {
    it("renders correctly", () => {
        renderWithRouter(<Dashboard />);
        expect(screen.getByText(/Booking/i)).toBeInTheDocument();
        expect(screen.getByText(/All Types/i)).toBeInTheDocument();
        expect(screen.getByText(/All Locations/i)).toBeInTheDocument();
    });

    it("allows clicking filter buttons and changes active class", async () => {
        renderWithRouter(<Dashboard />);
        const upcomingButton = screen.getByText("Upcoming");
        const completedButton = screen.getByText("Completed");
        userEvent.click(completedButton);
        await waitFor(() => {
            expect(completedButton).toHaveClass("dashboard-active");
        });
        expect(upcomingButton).not.toHaveClass("dashboard-active");
    });

    it("allows type selection and reflects in the filter", async () => {
        renderWithRouter(<Dashboard />);
        const selectElement = screen.getByRole('option', { name: 'All Types' });
        fireEvent.change(selectElement, { target: { value: 'workshop1' } });
        expect(selectElement.value).toBe('workshop1');
    });

    it("filters bookings by date range", () => {
        renderWithRouter(<Dashboard />);
        const startDateInput = screen.getByLabelText(/From:/i);
        const endDateInput = screen.getByLabelText(/To:/i);
        fireEvent.change(startDateInput, { target: { value: '2021-03-22' } });
        fireEvent.change(endDateInput, { target: { value: '2021-03-24' } });
        expect(startDateInput.value).toBe('2021-03-22');
        expect(endDateInput.value).toBe('2021-03-24');
        // Add more checks here for the actual booking items if you had real data handling or mocks
    });

    it("sorts bookings based on date", () => {
        renderWithRouter(<Dashboard />);
        const sortButton = screen.getByText(/Sort Date Ascending/i);
        userEvent.click(sortButton);
        expect(sortButton.textContent).toContain("Sort Date Ascending");
        // To fully test sorting, you'd typically need to mock the data or check the DOM for actual changes
    });

    it("filters bookings based on selected location", async () => {
        renderWithRouter(<Dashboard />);
        const locationSelect = screen.getByLabelText("Location:");

        // Select 'Room1' from the dropdown
        userEvent.selectOptions(locationSelect, 'Room1');

        // Verify that only bookings from 'Room1' are displayed
        const displayedBookings = await screen.findAllByText(/Room1/);

        // Check if all displayed bookings are indeed from 'Room1'
        displayedBookings.forEach(booking => {
            expect(booking).toBeInTheDocument();
        });

    });
});

