import { ModalWithDataCall } from '@/common/providers/modal/types'
import { PostListItemType } from '@/forum/components/PostList/PostListItem'
import { ForumPost } from '@/forum/types/ForumPost'

export * from './EditPostModal'
export type EditPostModalCall = ModalWithDataCall<
  'EditPost',
  { post: ForumPost; newText: string; type: PostListItemType }
>
