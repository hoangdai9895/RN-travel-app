import React from "react";
import {
	SafeAreaView,
	View,
	StyleSheet,
	Text,
	Animated,
	Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { images, theme } from "../../constants";

const { onboarding1, onboarding2, onboarding3 } = images;
const { COLORS, FONTS, SIZES } = theme;

const onBoardings = [
	{
		title: "Let's Travelling",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
		img: onboarding1,
	},
	{
		title: "Navigation",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
		img: onboarding2,
	},
	{
		title: "Destination",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
		img: onboarding3,
	},
];

const OnBoarding = () => {
	const scrollX = new Animated.Value(0);

	function renderContent() {
		return (
			<Animated.ScrollView
				horizontal
				pagingEnabled
				scrollEnabled
				decelerationRate={0}
				snapToAlignment="center"
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{
						useNativeDriver: false,
					}
				)}>
				{onBoardings.map((e, i) => (
					<View key={i} style={{ width: SIZES.width }}>
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
							}}>
							<Image
								source={e.img}
								resizeMode="cover"
								style={{ width: "100%", height: "100%" }}
							/>
						</View>
						<View
							style={{
								position: "absolute",
								bottom: "10%",
								left: 40,
								right: 40,
							}}>
							<Text
								style={{
									...FONTS.h1,
									color: COLORS.gray,
									textAlign: "center",
								}}>
								{e.title}
							</Text>
							<Text
								style={{
									...FONTS.body3,
									textAlign: "center",
									marginTop: SIZES.base,
									color: COLORS.gray,
								}}>
								{e.description}
							</Text>
						</View>
						{/* button */}
						<TouchableOpacity
							style={{
								position: "absolute",
								bottom: 0,
								right: 0,
								width: 150,
								height: 60,
								paddingLeft: 20,
								justifyContent: "center",
								borderTopLeftRadius: 30,
								borderBottomLeftRadius: 30,
								backgroundColor: COLORS.blue,
							}}
							onPress={() => console.log("aaa")}>
							<Text>Skip</Text>
						</TouchableOpacity>
					</View>
				))}
			</Animated.ScrollView>
		);
	}

	const renderDots = () => {
		const dotPosition = Animated.divide(scrollX, SIZES.width);
		return (
			<View style={styles.dotContainer}>
				{onBoardings.map((item, index) => {
					const opacity = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [0.3, 1, 0.3],
						extrapolate: "clamp",
					});

					const dotSize = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [SIZES.base, 17, SIZES.base],
						extrapolate: "clamp",
					});

					return (
						<Animated.View
							key={index}
							opacity={opacity}
							style={[
								styles.dot,
								{
									width: dotSize,
									height: dotSize,
								},
							]}></Animated.View>
					);
				})}
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View>{renderContent()}</View>
			<View style={styles.dotRootContainer}>{renderDots()}</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
	},
	dot: {
		borderRadius: SIZES.radius,
		backgroundColor: COLORS.blue,
		marginHorizontal: SIZES.radius / 2,
	},
	dotContainer: {
		flexDirection: "row",
		height: SIZES.padding,
		alignItems: "center",
		justifyContent: "center",
	},
	dotRootContainer: {
		position: "absolute",
		bottom: SIZES.height > 700 ? "30%" : "20%",
	},
});

export default OnBoarding;
