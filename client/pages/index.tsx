import Layout from "../components/Layout";
import React from "react";
import axios from "axios";
import styles from "../styles/index.module.css";
import { Input, Button, Typography, Grid } from "@material-ui/core";

class IndexPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			gameName: "",
			dog: true,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event): void {
		this.setState({ gameName: event.target.value });
	}

	render(): JSX.Element {
		const cannotFindGame = "It doesn't seem like there's anything on this game.";
		const errorMessage = "Oops, something went wrong!";
		const getAPIPost = async () => {
			try {
				const res = await axios.post("/api/dogs", { name: this.state.gameName });
				// console.log(res.data.data.text);
				const tweetText: string = res.data.data.text;
				this.setState({
					message: tweetText,
					dog: tweetText.toLowerCase().includes("dog"),
				});
			} catch (err) {
				console.log(err);
				if (err.response != undefined && err.response.status === 404) {
					this.setState({
						message: cannotFindGame,
					});
				} else {
					this.setState({
						message: errorMessage,
					});
				}
			}
		};

		const displayMessage = () => {
			if (!this.state.message) {
				return "";
			} else if (this.state.message === cannotFindGame || this.state.message === errorMessage) {
				return this.state.message;
			} else {
				let url = "";
				let message = this.state.message.trim();
				for (let i = message.length - 1; i > 0; i--) {
					if (message[i] === " ") {
						url = message.slice(i + 1, message.length);
						console.log(url);
						message = message.slice(0, i);
						break;
					}
				}
				if (this.state.dog) {
					return (
						<div>
							<p>{message}</p>
							<img src={url} alt="Image of Game" />
						</div>
					);
				}
				return `You cannot pet the dog in ${this.state.gameName}...
But, ${message}`;
			}
		};

		return (
			<Layout title="Can You Pet The Dog">
				<div>
					<Grid container direction="row" spacing={4} alignItems="center" justify="center">
						<Grid item xs={1} />
						<Grid item xs={10}>
							<Typography variant="h1" align="center" className={styles.titleText}>
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
								style={{ width: "70%", color: "#abb2bf" }}
								color="secondary"
							/>
							<Button className={styles.searchButton} style={{ backgroundColor: "#e6c07b" }} onClick={getAPIPost}>
								Find
							</Button>
						</Grid>
						<Grid item xs={2} />
						<Grid item xs={8}>
							<Typography style={{ whiteSpace: "pre-line" }} variant="h4" align="center">
								{displayMessage()}
							</Typography>
						</Grid>
						<Grid item xs={2} />
					</Grid>
				</div>
			</Layout>
		);
	}
}

export default IndexPage;
