import Layout from "../components/Layout";
import { DisplayTweet } from "../components/Tweet";
import { Data } from "../interfaces";
import React from "react";
import axios, { AxiosResponse } from "axios";
import styles from "../styles/index.module.css";

interface AppProps {}

interface AppState {
	message: string;
	gameName: string;
	tweetId: string;
	dog: boolean;
}

interface AxiosPostData {
	name: string;
}

interface AxiosReturnData {
	data: Data;
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
		this.setState({ gameName: event.target.value });
	}

	render(): JSX.Element {
		const cannotFindGame = "It doesn't seem like there's anything on this game.";
		const errorMessage = "Oops, something went wrong!";
		const getAPIPost = async (): Promise<void> => {
			// reset state
			this.setState({
				tweetId: "",
				message: "",
			});
			try {
				const res = await axios.post<AxiosPostData, AxiosResponse<AxiosReturnData>>("/api/dogs", {
					name: this.state.gameName,
				});
				console.log(res);
				const tweet = res.data.data;
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

		const displayMessage = (): JSX.Element => {
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
					<div className={styles.container}>
						<h1 className={styles.item}>Can You Pet The Dog?</h1>
						<div className={styles.item}>
							<input
								type="text"
								value={this.state.gameName}
								onChange={this.handleChange}
								placeholder="Enter a game name..."
								className={styles.gameNameInput}
							/>
							<button className={styles.searchButton} onClick={getAPIPost}>
								Find
							</button>
						</div>
						<div className={styles.tweet}>{displayMessage()}</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default IndexPage;
