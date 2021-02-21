import Layout from "../components/Layout";
import axios from "axios";
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
			const res = await axios.get<{ text: string }>("/api/dogs");
			this.setState({
				message: res.data.text,
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
