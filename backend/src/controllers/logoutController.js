const logoutController = {};

logoutController.logout = (req, res) => {
    res.clearCookie("authToken");

    return res.status(200).json({ message: "Sign out" });
};

export default logoutController;
