import ChatApp from "@/components/chatApp/ChatApp";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Edit/Delete Message", () => {
  const userName = "TEST_USER";
  const message = "random message";
  const editedMessage = "Edited Message";

  beforeEach(() => {
    localStorage.clear();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    render(<ChatApp />);
  });

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

  const deleteMessage = async () => {
    const deleteMessageButton = screen.getByRole("button", { name: "delete-message" });
    expect(deleteMessageButton).toBeInTheDocument();
    userEvent.click(deleteMessageButton);

    const deleteModal = await screen.findByRole("confirmation-box");
    expect(deleteModal).toBeInTheDocument();

    const confirmButton = await screen.findByRole("button", { name: "CONFIRM" });
    await userEvent.click(confirmButton);
  };

  const editMessage = async (newText: string) => {
    const editMessageButton = screen.getByRole("button", { name: "edit-message" });
    expect(editMessageButton).toBeInTheDocument();
    userEvent.click(editMessageButton);

    const modalInput = await screen.findByRole("modal-input");
    expect(modalInput).toBeInTheDocument();
    await userEvent.type(modalInput, newText);

    const confirmButton = screen.getByRole("button", { name: "CONFIRM" });
    await userEvent.click(confirmButton);
  };

  test("Testing Delete Message Functionality", async () => {
    const testUser = await addUser(userName);
    await userEvent.click(testUser);
    await sendMessage(message);

    await deleteMessage();

    const messageBox = screen.queryAllByText(message);
    expect(messageBox).toHaveLength(0);
  });

  test("Testing Edit Message Functionality", async () => {
    const testUser = await addUser(userName);
    await userEvent.click(testUser);
    await sendMessage(message);

    await editMessage(editedMessage);

    const messageBox = await screen.findAllByText(editedMessage);
    expect(messageBox).toHaveLength(3);
  });
});
