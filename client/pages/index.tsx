import Layout from "../components/Layout";
import React from "react";
import axios from "axios";
import "../styles/Home.module.css";
import { Input, Button, Typography, Grid } from "@material-ui/core";
class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			gameName: "",
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ gameName: event.target.value });
	}

	render() {
		const getAPIPost = async () => {
			try {
				const res = await axios.post("/api/dogs", { name: this.state.gameName });
				console.log(res.data.data.text);
				this.setState({
					message: res.data.data.text,
				});
			} catch (err) {
				if (err.response.status === 404) {
					this.setState({
						message: "It doesn't seem like there's anything on this game.",
					});
				} else {
					this.setState({
						message: "Oops, something went wrong!",
					});
				}
			}
		};

		return (
			<Layout title="Can You Pet The Dog">
				<div className="root">
					<Grid container direction="row" spacing={4} alignItems="center" justify="center">
						<Grid item xs={1} />
						<Grid item xs={10}>
							<Typography variant="h1" align="center">
								Can You Pet The Dog?
							</Typography>
						</Grid>
						<Grid item xs={1} />
						<Grid item xs={1} />
						<Grid item xs={10}>
							<Input
								type="text"
								value={this.state.gameName}
								onChange={this.handleChange}
								placeholder="Enter a game name..."
								style={{ width: "70%" }}
							/>
							<Button style={{ backgroundColor: "coral", width: "30%" }} onClick={getAPIPost}>
								Find
							</Button>
						</Grid>
						<Grid item xs={1} />
						<Grid item xs={10}>
							<p hidden={this.state.message === ""}>{this.state.message}</p>
						</Grid>
						<Grid item xs={1} />
					</Grid>
				</div>
			</Layout>
		);
	}
}

export default IndexPage;
