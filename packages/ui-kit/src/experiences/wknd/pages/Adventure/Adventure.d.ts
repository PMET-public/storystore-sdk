export type AdventureProps = {
  path: string
  checkedIn?: boolean
  bookmarked?: boolean
  onCheckIn?: (id: string) => any
  onBookmark?: (id: string) => any
}
