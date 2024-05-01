/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Templates from "../../pages/Templates"; // Update the import path as necessary
import * as TemplateAPI from "../../api/TemplateAPI";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Retain other functionalities
    useNavigate: () => jest.fn().mockImplementation(() => (path) => { })
}));

jest.mock("../../api/TemplateAPI");

describe("Templates Component Tests", () => {
    beforeEach(async () => {
        TemplateAPI.getAllTemplates.mockResolvedValue([]);
        await act(async () => {
            render(<Templates />, { wrapper: Router });
        });
    });

    it("renders and shows loading indicator", async () => {
        // Ensure the mock resolves after some time to simulate fetching delay
        TemplateAPI.getAllTemplates.mockResolvedValueOnce([]);
        const { rerender } = render(<Templates />, { wrapper: Router });

        // Check immediately for the "Loading..." text
        expect(screen.getByText("Loading...")).toBeInTheDocument();

        // Wait for re-render after fetch completes
        await waitFor(() => {
            expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });
    });


    it("displays templates after fetching", async () => {
        const mockTemplates = [
            { id: "1", name: "Template 1" },
            { id: "2", name: "Template 2" }
        ];
        TemplateAPI.getAllTemplates.mockResolvedValue(mockTemplates);

        render(<Templates />, { wrapper: Router }); 
        // Wait for the templates to be displayed
        await waitFor(() => {
            expect(screen.getByText("Template 1")).toBeInTheDocument();
            expect(screen.getByText("Template 2")).toBeInTheDocument();
        });
    });


});
