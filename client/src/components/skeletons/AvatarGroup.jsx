import { Skeleton, Stack } from '@mui/material'

export default function SkeletonAvatarGroup({ count = 4, size = 45 }) {
	return (
		<Stack direction="row" spacing={-1.5}>
			{[...Array(count)].map((_, index) => (
				<Skeleton
					key={index}
					variant="circular"
					width={size}
					height={size}
					sx={{
						border: (theme) => `2px solid ${theme.palette.background.paper}`,
						bgcolor: (theme) => theme.palette.text.secondary
					}}
				/>
			))}
		</Stack>
	)
}
