import { StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import data from '../data/apods.json'

import { useEffect, useState } from 'react'
import FullScreenImage from '../components/FullScreenImage'
import { Apod } from '../types'
import { fetchApods } from '../api/apods'
import { Link } from 'expo-router'
import ApodListItem from 'components/ApodListItem'

export default function Page() {
	const [apods, setApods] = useState<Apod[]>(null)
	const [activePicture, setActivePicture] = useState<string>(null)

	useEffect(() => {
		fetchApods().then(setApods)
	}, [])

	if (!apods) {
		return <ActivityIndicator />
	}

	return (
		<>
			<Link href={'/AboutUs'}>About Us</Link>
			<FlatList
				data={apods}
				renderItem={({ item }) => (
					<ApodListItem
						apod={item}
						onImagePress={() => setActivePicture(item.url)}
					/>
				)}
			/>
			<FullScreenImage
				url={activePicture}
				onClose={() => setActivePicture(null)}
			/>
		</>
	)
}

const styles = StyleSheet.create({})
