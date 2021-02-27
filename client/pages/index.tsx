import Layout from "../components/Layout";
import React from "react";
import axios from "axios";
import _ from "lodash";
import { Button } from "@material-ui/core";

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "Waiting for res...",
		};
	}

	render() {
		const getAPIPost = async () => {
			const res = await axios.get("/api/dogs");
			console.log(res.data.data.text);
			this.setState({
				message: res.data.data.text,
			});
		};

		return (
			<Layout title="Home | Next.js + TypeScript Example">
				<Button onClick={getAPIPost}>GET SOME JSON</Button>
				<p>{this.state.message}</p>
			</Layout>
		);
	}
}

export default IndexPage;
