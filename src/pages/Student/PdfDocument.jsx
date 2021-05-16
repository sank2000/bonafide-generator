import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { format, sub } from 'date-fns';

import timesBold from 'assets/font/times-bold.ttf';
import timesNormal from 'assets/font/times.ttf';

Font.register({ family: 'TimesNewRoman', src: timesNormal });
Font.register({ family: 'TimesNewRoman', src: timesBold, fontWeight: 'bold' });

const styles = StyleSheet.create({
	page: {
		backgroundColor: '#ffff',
		position: 'relative',
		padding: 30,
		fontFamily: 'TimesNewRoman'
	},
	section: {
		width: '100%'
	},
	top: {
		flexDirection: 'row',
		paddingBottom: '5'
	},
	logo: {
		width: 60,
		height: 60
	},
	title: {
		flex: 1
	},
	title1: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontSize: 14,
		fontWeight: 'bold'
	},
	title2: {
		textAlign: 'center',
		fontSize: 10,
		color: '#696969'
	},
	watermark_container: {
		position: 'absolute',
		top: '50%',
		left: '45%',
		transform: 'translate(-50%,-45%),rotate(-45deg)',
		zIndex: -1
	},
	watermark: {
		color: '#D3D3D3',
		fontSize: 50
	},
	content: {
		flexGrow: 1,
		fontSize: 14
	},
	break: {
		height: 1,
		margin: '2 0',
		width: '100%',
		backgroundColor: 'black'
	},
	concern: {
		textAlign: 'center',
		textDecoration: 'underline',
		margin: '10 0 30'
	},
	contentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	bold: {
		fontWeight: 'semibold'
	},
	contentText: {
		lineHeight: '1.6',
		display: 'inline-block'
	},
	profile: {
		width: 80,
		height: 80
	},
	bottom: {
		fontSize: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

const MyDocument = ({ data }) => {
	return (
		<Document>
			<Page size='A4' object-fit='fill' style={styles.page}>
				<View style={styles.top}>
					<Image src='/images/au_logo.png' style={styles.logo}></Image>
					<View style={styles.title}>
						<Text style={styles.title1}>UNIVERSITY COLLEGE OF ENGINEERING</Text>
						<Text style={styles.title2}>
							BHARATHIDASAN INSTITUTE OF TECHNOLOGY <span style={styles.bold}>(BIT)</span> Campus
						</Text>
						<Text style={styles.title1}>Anna University</Text>
						<Text style={styles.title1}>TIRUCHIRAPPALI - 620 024</Text>
					</View>
				</View>
				<View style={styles.break}></View>
				<View style={styles.content}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View>
							<Text>Dr. I.DEAN</Text>
							<Text> Dean </Text>
						</View>
						<View style={{ alignItems: 'center' }}>
							<Text style={{ marginBottom: '10' }}>
								Date : {format(new Date(), 'dd - LL - yyyy')}
							</Text>
							<Image src={data.profileImg} style={styles.profile}></Image>
						</View>
					</View>

					<View>
						<Text style={styles.concern}>TO WHOMSOEVER IT MAY CONCERN</Text>
					</View>
					<View>
						<Text style={{ ...styles.contentText, textIndent: '50px' }}>
							This is to certify that {data.gender === 'male' ? 'Mr' : 'Mrs'}.{' '}
							<span style={styles.bold}>{data.name}</span> (Reg NO :{data.registerNumber}) is a
							bonafide student of the University College of Engineering (Bharathidasan Institute of
							Technology (BIT) Campus, Anna university) Tiruchirappalli and{' '}
							{data.gender === 'male' ? 'he' : 'she'} is doing{' '}
							<span style={styles.bold}>{data.degree}</span> programme in the branch of{' '}
							<span style={styles.bold}>{data.department} </span>
							during the academic year <span style={styles.bold}>{data.batch}</span> in REGULAR mode
							and medium of instruction is
							<span style={styles.bold}> ENGLISH</span>.
						</Text>
						<View style={{ margin: '40 0' }}>
							<Text style={{ ...styles.contentTex }}>
								{data.gender === 'male' ? 'He' : 'She'} has availed Government scholarship through
								this institution from the year{' '}
								<span style={styles.bold}>
									{format(sub(new Date(), { years: 1 }), 'yyyy')} - {format(new Date(), 'yyyy')}.
								</span>
							</Text>
							<Text style={{ ...styles.contentText, marginTop: '15' }}>
								This certificate is issued for the purpose of
								<span style={styles.bold}> APPLYING SCHOLARSHIP.</span>
							</Text>
						</View>

						<Text style={{ ...styles.contentText, margin: '20 0' }}>
							This is issued at his request dated &nbsp;
							<span style={{ textDecoration: 'underline' }}>
								{data.createdAt
									? format(new Date(data.createdAt), 'dd - LL - yyyy')
									: format(new Date(), 'dd - LL - yyyy')}
							</span>
							.
						</Text>
					</View>
				</View>
				<View style={styles.break}></View>
				<View style={styles.bottom}>
					<Text>BIT Campus, Tiruchirappalli - 620 024</Text>
					<Text>Tel : 0431-2407946</Text>
					<Text>Fax : 0431-2407999</Text>
				</View>
				<View style={styles.watermark_container}>
					<Text style={styles.watermark}>unofficial</Text>
				</View>
			</Page>
		</Document>
	);
};

export default MyDocument;
