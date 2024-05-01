import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import NewBooking from "../../pages/NewBooking";  // Update the import path as necessary
import { waitFor } from '@testing-library/react';

describe("NewBooking Component", () => {
    beforeEach(() => {
        render(<NewBooking />);
    });

    it("renders and switches categories correctly", () => {
        // Initial active category is "Delivery"
        expect(screen.getByText("Program Stream:")).toBeInTheDocument();

    });

    it("handles input in the 'School' form correctly", async () => {
        userEvent.click(screen.getByText("School"));
        const schoolNameInput = await screen.findByLabelText("School Name:");
        userEvent.type(schoolNameInput, "MTC");
        await waitFor(() => {
            expect(schoolNameInput.value).toBe("MTC");
        });
        

        // Toggle years
        const yearCheckbox = screen.getByLabelText("Year 7");
        userEvent.click(yearCheckbox);
        // selectedyears.value
        expect(yearCheckbox).toBeChecked();
    });

    it("submits the 'Bus' form correctly", async () => {
        // Activate "Bus" category
        userEvent.click(screen.getByText("Bus"));

        // Ensure the form is rendered before attempting to find elements
        const busReqInput = await screen.findByLabelText("BUS REQ:");
        userEvent.type(busReqInput, "12345");
        await waitFor(() => {
            expect(busReqInput).toHaveValue("12345");
        });

        // Select from dropdown
        const statusSelect = await screen.findByLabelText("Status:");
        userEvent.selectOptions(statusSelect, "paid");
        expect(statusSelect).toHaveValue("paid");

        // Submit the form
        const submitButton = screen.getByRole('button', { name: "Submit" });
        userEvent.click(submitButton);

        // Add assertions if there are effects or callbacks to test upon form submission
        // Example: Check if a mock function was called, if using mock functions to simulate API calls
    });

    it("manages state changes in the 'Others' form correctly",async () => {
        // Activate "Others" category
        userEvent.click(screen.getByText("Others"));
        const profitInput = await screen.findByLabelText("Profit:"); 
        userEvent.type(profitInput, "500");
        await waitFor(() => {
            expect(profitInput.value).toBe("500");
        });
    });
});
