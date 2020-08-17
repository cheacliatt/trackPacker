import React, { useState, useContext } from "react";
import API from "../../utils/API";
import Grid from "@material-ui/core/Grid";
import ExcursionCard from "../../components/ExcursionCard/ExcursionCard";
import User from "../../components/User/User";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { UserContext } from "../../utils/UserContext";
import authConfig from "../../utils/authConfigHelper";

const Excursions = ({ history }) => {
  const [newExcursion, setNewExcursion] = useState("");

  const { userData, setUserData } = useContext(UserContext);

  const handleChange = ({ target: { value } }) => {
    setNewExcursion(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const excursionObj = { name: newExcursion }
    API.addExcursion(excursionObj, authConfig)
      .then(response => {
        const updatedUser = userData;
        updatedUser.excursions.push(response.data.data);
        setUserData({ ...updatedUser, isAuthenticated: true });
        setNewExcursion({ name: "" });
      })
      .catch((err) => console.log(err));
  };

  const deleteExcursion = id => {
    API.deleteExcursion(id, authConfig)
      .then(response => {
        const updatedExcursions = userData.excursions.filter(excursion => excursion._id != response.data.data._id);
        const updatedUser = userData;
        updatedUser.excursions = updatedExcursions;
        setUserData({ ...updatedUser, isAuthenticated: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} sm={3}>
          <User />
        </Grid>
        <Grid item xs={12} sm={9}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="newExcursion"
              placeholder="Add an Excursion"
              onChange={handleChange}
            ></TextField>
            <Button type="submit">Submit</Button>
          </form>

          {userData.excursions &&
            userData.excursions.map(excursion => (
              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                p={1}
                mx="auto"
              >
                <ExcursionCard
                  excursionId={excursion._id}
                  excursionName={excursion.name}
                  deleteExcursion={deleteExcursion}
                />
              </Box>
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Excursions;
