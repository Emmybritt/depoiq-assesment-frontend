import { render, screen } from "@testing-library/react";
import { UserProfile } from "./user-profile-dropdown";
import { userMock } from "./user.mock";

describe("UserProfile Component", () => {
  it("renders the user avatar and username or email", () => {
    render(<UserProfile user={userMock} />);

    const userAvatar = screen.getByAltText("user");
    expect(userAvatar).toBeInTheDocument();

    const userNameOrEmail = screen.getByText(
      userMock.username ?? userMock.emailAddresses[0].emailAddress
    );
    expect(userNameOrEmail).toBeInTheDocument();
  });
});
