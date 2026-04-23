import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "./TaskList";
import {useTask} from "../../context/TaskContext";

jest.mock("../../context/TaskContext", () => ({
    useTask: jest.fn()
}));

jest.mock("./TaskCard", () => ({task}) => <div data-testid="task-card">{task.name}</div>);

describe("TaskList", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls getTasks on mount", () => {
        const getTasks = jest.fn();
        useTask.mockReturnValue({
            tasks: [],
            getTasks,
            loading: false
        });

        render(<TaskList />);

        expect(getTasks).toHaveBeenCalledTimes(1);
    });

    it("renders loading state", () => {
        useTask.mockReturnValue({
            tasks: [],
            getTasks: jest.fn(),
            loading: true
        });

        render(<TaskList />);

        expect(screen.getByText("Cargando tareas...")).toBeInTheDocument();
    });
});
