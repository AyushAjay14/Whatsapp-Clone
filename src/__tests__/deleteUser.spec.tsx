import ChatApp from "@/components/chatApp/ChatApp";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ChatApp User Management", () => {
  beforeEach(() => {
    render(<ChatApp />);
  });

  const createNewUser = async (userName: string) => {
    const addUserButton = screen.getByRole("button", {
      name: /start new conversation/i,
    });
    userEvent.click(addUserButton);

    const modalInput = await screen.findByRole("modal-input");
    const saveButton = await screen.findByRole("button", {
      name: /save/i,
    });

    await userEvent.type(modalInput, userName);
    await userEvent.click(saveButton);

    return screen.findByText(userName);
  };

  const deleteUser = async (userElement: HTMLElement) => {
    await userEvent.hover(userElement);

    const deleteUserButton = await screen.findByRole("button", {
      name: /delete/i,
    });
    await userEvent.click(deleteUserButton);

    const confirmDeleteButton = await screen.findByRole("button", {
      name: /yes/i,
    });
    await userEvent.click(confirmDeleteButton);
  };

  test("should delete an existing user", async () => {
    const userName = "TEST_USER";
    const testUser = await createNewUser(userName);

    expect(testUser).toBeInTheDocument();

    await deleteUser(testUser);
    expect(screen.queryByText(userName)).not.toBeInTheDocument();
  });
});
