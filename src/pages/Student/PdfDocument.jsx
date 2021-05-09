import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		backgroundColor: '#ffff',
		position: 'relative',
		padding: 30
	},
	section: {
		width: '100%'
	},
	title: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontSize: 30,
		marginBottom: 25
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
		flexGrow: 1
	}
});

const MyDocument = () => (
	<Document>
		<Page size='A4' object-fit='fill' style={styles.page}>
			<View style={styles.top}>
				<Text style={styles.title}>Bonafide</Text>
			</View>
			<View style={styles.content}>
				<Text>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate recusandae fugit nisi
					error, debitis totam quam, culpa rerum, veritatis provident ut placeat optio adipisci
					velit ad exercitationem aspernatur ex dolorum?
				</Text>
			</View>
			<View style={styles.bottom}>
				<Text style={{ fontSize: 14 }}>Generated at :</Text>
				<Text style={{ fontSize: 10 }}>{new Date().toString()}</Text>
			</View>
			<View style={styles.watermark_container}>
				<Text style={styles.watermark}>unofficial</Text>
			</View>
		</Page>
	</Document>
);

export default MyDocument;
