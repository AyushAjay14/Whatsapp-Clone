import ChatApp from "@/components/chatApp/ChatApp";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("check funtionality of Compact Mode Button", () => {
  const userName = "TEST_USER";
  const message = "random message";
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  render(<ChatApp />);

  const addUser = async (name: string) => {
    const addUserButton = screen.getByRole("button", { name: /start new conversation/i });
    expect(addUserButton).toBeInTheDocument();
    userEvent.click(addUserButton);

    const modalInput = await screen.findByRole("modal-input");
    expect(modalInput).toBeInTheDocument();
    await userEvent.type(modalInput, name);

    const saveButton = await screen.findByRole("button", { name: "SAVE" });
    expect(saveButton).toBeInTheDocument();
    await userEvent.click(saveButton);

    const testUser = await screen.findByText(name);
    expect(testUser).toBeInTheDocument();

    return testUser;
  };

  const sendMessage = async (text: string) => {
    const messageInput = await screen.findByRole("message-input");
    expect(messageInput).toBeInTheDocument();
    await userEvent.type(messageInput, text);

    const sendMessageButton = screen.getByRole("button", { name: "send-message" });
    expect(sendMessageButton).toBeInTheDocument();
    await userEvent.click(sendMessageButton);
  };
  test("check funtionality of Compact Mode Button", async () => {
    const testUser = await addUser(userName);
    await userEvent.click(testUser);
    await sendMessage(message);
    const compactModeButton = screen.getByRole("button", { name: "compact-mode" });
    expect(compactModeButton).toBeInTheDocument();
    await userEvent.click(compactModeButton);
    const messageBox = await screen.findAllByText(message);
    expect(messageBox).toHaveLength(2);
    expect(screen.queryByRole("paragraph", { name: "timestamp" })).not.toBeInTheDocument();
  });
});
