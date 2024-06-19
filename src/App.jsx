import {
	MinChatUiProvider,
	MainContainer,
	MessageInput,
	MessageContainer,
	MessageList,
	MessageHeader
} from "@minchat/react-chat-ui";
import React from "react";

function App() {
	const [messages, setMessages] = React.useState([]);

	const onSendMessage = async (value) => {
		if (!value) return

		setMessages([...messages, {
			text: value,
			user: {
				id: 'user',
				name: 'User',
			},
		}]);

		let res = await fetch('http://localhost:3000/?prompt=' + value + '', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		res = await res.text()

		setMessages((prev) => [...prev, {
			text: res,
			user: {
				id: 'gemini',
				name: 'Gemini',
			},
		}])
	}

	return (
		<div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<MinChatUiProvider theme="#6ea9d7">
				<MainContainer style={{ height: '100%', width: '50%' }}>
					<MessageContainer>
						<MessageHeader />
						<MessageList
							currentUserId='user'
							messages={messages}
						/>
						<MessageInput onSendMessage={onSendMessage} placeholder="Type message here" />
					</MessageContainer>
				</MainContainer>
			</MinChatUiProvider>
		</div>
	)
}

export default App
