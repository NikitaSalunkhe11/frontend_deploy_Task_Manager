import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              cursor: "pointer",
              fontFamily: "Monospace",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/")}
          >
            TaskQue
          </Typography>
          {user && (
            <Typography
              variant="h6"
              color="orange"
              sx={{ fontFamily: "Monospace" }}
            >
              Welcome, {user.name}
            </Typography>
          )}
        </Box>

        <Box>
          {user ? (
            <Button color="inherit" onClick={handleLogout}
              sx={{
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "20px",
                  px: 3,
                  py: 1,
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
                sx={{
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "20px",
                  px: 3,
                  py: 1,
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black", 
                  },
                }}
              >
                Login
              </Button>

              <Button
                color="inherit"
                onClick={() => navigate("/register")}
                sx={{
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "20px",
                  px: 3,
                  py: 1,
                  mx: 1,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
