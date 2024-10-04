import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatApp from "../components/chatApp/ChatApp";

describe("ChatApp message flow", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  beforeEach(() => {
    render(<ChatApp />);
  });

  const startNewConversation = async (userName: string) => {
    const addUserButton = screen.getByRole("button", {
      name: /start new conversation/i,
    });
    userEvent.click(addUserButton);

    const modalInput = await screen.findByRole("modal-input");
    await userEvent.type(modalInput, userName);

    const saveButton = await screen.findByRole("button", {
      name: /save/i,
    });
    await userEvent.click(saveButton);
  };

  const sendMessage = async (message: string) => {
    const messageInput = await screen.findByRole("message-input");
    await userEvent.type(messageInput, message);

    const sendMessageButton = screen.getByRole("button", {
      name: /send-message/i,
    });
    await userEvent.click(sendMessageButton);
  };

  test("should add a new user", async () => {
    const userName = "TEST_USER";
    await startNewConversation(userName);

    const testUser = await screen.findByText(userName);
    expect(testUser).toBeInTheDocument();
  });

  test("should send a message to the new user", async () => {
    const userName = "TEST_USER";
    const testUser = await screen.findByText(userName);
    await userEvent.click(testUser);

    const message = "random message";
    await sendMessage(message);

    const messageBox = await screen.findAllByText(message);
    expect(messageBox).toHaveLength(3);
  });
});
