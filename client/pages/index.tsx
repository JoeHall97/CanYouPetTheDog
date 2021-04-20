import Layout from "../components/Layout";
import { DisplayTweet } from "../components/Tweet";
import React from "react";
import axios from "axios";
import styles from "../styles/index.module.css";

interface AppProps {}

interface AppState {
	message: string;
	gameName: string;
	tweetId: string;
	dog: boolean;
}

class IndexPage extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			message: "",
			gameName: "",
			tweetId: "",
			dog: true,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event: any): void {
		console.log(typeof event);
		this.setState({ gameName: event.target.value });
	}

	render(): JSX.Element {
		const cannotFindGame = "It doesn't seem like there's anything on this game.";
		const errorMessage = "Oops, something went wrong!";
		const getAPIPost = async () => {
			// reset state
			this.setState({
				tweetId: "",
				message: "",
			});
			try {
				const res = await axios.post("/api/dogs", { name: this.state.gameName });
				const tweet: { id: string; text: string } = res.data.data;
				this.setState({
					tweetId: tweet.id,
					message: tweet.text,
					dog: tweet.text.toLowerCase().includes("dog"),
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
				return <div></div>;
			} else if (this.state.message === cannotFindGame || this.state.message === errorMessage) {
				return <div>{this.state.message}</div>;
			} else {
				console.log(this.state.tweetId);
				return <DisplayTweet tweetId={this.state.tweetId} />;
			}
		};

		return (
			<Layout title="Can You Pet The Dog">
				<div>
					{/* <Grid container direction="row" spacing={4} alignContent="center" alignItems="center" justify="center">
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
								className={styles.gameNameInput}
								style={{ color: "#abb2bf" }}
								color="secondary"
							/>
							<Button className={styles.searchButton} style={{ backgroundColor: "#e6c07b" }} onClick={getAPIPost}>
								Find
							</Button>
						</Grid>
						<Grid item xs={1} />
						<Grid item xs={4} />
						<Grid item xs={4}>
							<div className={styles.tweet}>{displayMessage()}</div>
						</Grid>
						<Grid item xs={4} />
					</Grid> */}
					<div className={styles.container}>
						{/* <div className={styles.item}> */}
						<h1 className={[styles.titleText, styles.item].join(" ")}>Can You Pet The Dog?</h1>
						{/* </div> */}
						<div className={styles.item}>
							<input
								type="text"
								value={this.state.gameName}
								onChange={this.handleChange}
								placeholder="Enter a game name..."
								className={styles.gameNameInput}
								style={{ color: "#abb2bf" }}
								color="secondary"
							/>
							<button className={styles.searchButton} onClick={getAPIPost}>
								Find
							</button>
						</div>
						{/* <div className={styles.item}> */}
						<div className={[styles.tweet, styles.item].join(" ")}>{displayMessage()}</div>
						{/* </div> */}
					</div>
				</div>
			</Layout>
		);
	}
}

export default IndexPage;
