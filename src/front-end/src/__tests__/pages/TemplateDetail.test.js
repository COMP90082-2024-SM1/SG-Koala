/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React, { useState, useEffect } from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import TemplateDetail from "../../pages/TemplateDetail";
import * as TemplateAPI from "../../api/TemplateAPI";
import { BrowserRouter as Router } from "react-router-dom";


const Item = ({ index, task, onTaskUpdate, onTaskRemove }) => {
    const [name, setName] = useState(task.name);
    const [link, setLink] = useState(task.link);

    // Use index or other unique identifiers for data-testid
    return (
        <div className="templateDetailItem">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => onTaskUpdate(index, name, link)}
                className="templateDetailInput"
                placeholder="task name"
                data-testid={`task-name-${index}`}
            />
            <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onBlur={() => onTaskUpdate(index, name, link)}
                className="templateDetailInput"
                placeholder="link (optional)"
                data-testid={`task-link-${index}`}
            />
            <button
                onClick={() => onTaskRemove(index)}
                className="templateDetailButton templateDetailDeleteButton"
                aria-label={"Delete Task"}
            />
        </div>
    );
};


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: '1'
    }),
    useNavigate: () => jest.fn()
}));

jest.mock("../../api/TemplateAPI");

describe("TemplateDetail Component Tests", () => {
    beforeEach(async () => {
        TemplateAPI.getTemplateById.mockResolvedValue({
            name: "Existing Template",
            task: [{ name: "Task 1", link: "http://example.com" }]
        });
        await waitFor(() => render(<TemplateDetail />, { wrapper: Router }));
    });

    it("handles task addition", async () => {
        TemplateAPI.getTemplateById.mockResolvedValue({
            name: "Some Template",
            task: []  // Ensure initial state is clear if the form starts empty
        });

        render(<TemplateDetail />, { wrapper: Router });

        // Assume the addButton is correctly labeled with an aria-label or data-testid
        const addButton = await screen.findByLabelText("Add Task");
        fireEvent.click(addButton);

        // Wait for inputs to be ready and interact with them
        const taskNameInput = await screen.findByTestId("task-name-0");
        const taskLinkInput = await screen.findByTestId("task-link-0");
        fireEvent.change(taskNameInput, { target: { value: 'Test Task' } });
        fireEvent.change(taskLinkInput, { target: { value: 'http://newlink.com' } });

        expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument();
        expect(screen.getByDisplayValue("http://newlink.com")).toBeInTheDocument();
    });


    it("updates tasks on blur", async () => {
        const mockUpdate = jest.fn();
        render(<Item index={0} task={{ name: "Old Task", link: "http://oldlink.com" }} onTaskUpdate={mockUpdate} />, { wrapper: Router });
        const nameInput = screen.getByDisplayValue("Old Task");
        fireEvent.change(nameInput, { target: { value: 'Updated Task' } });
        fireEvent.blur(nameInput);

        await waitFor(() => {
            expect(mockUpdate).toHaveBeenCalledWith(0, "Updated Task", "http://oldlink.com");
        });
    });

    it("deletes a task", async () => {
        const mockRemove = jest.fn();
        render(<Item index={0} task={{ name: "Task to Delete", link: "http://deletelink.com" }} onTaskRemove={mockRemove} />, { wrapper: Router });

        // Change from getByText to getByLabelText
        fireEvent.click(screen.getByLabelText("Delete Task"));

        await waitFor(() => {
            expect(mockRemove).toHaveBeenCalledWith(0);
        });
    });

});