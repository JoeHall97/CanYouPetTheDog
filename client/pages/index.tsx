import Layout from "../components/Layout";
import React from "react";
import axios from "axios";
import { Input, Button } from "@material-ui/core";

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "Waiting for res...",
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
			<Layout title="Home | Next.js + TypeScript Example">
				<form noValidate autoComplete="off">
					<Input
						type="text"
						value={this.state.gameName}
						onChange={this.handleChange}
						placeholder="Enter a game name..."
					/>
					<Button onClick={getAPIPost}>Find </Button>
				</form>
				<p>{this.state.message}</p>
			</Layout>
		);
	}
}

export default IndexPage;
