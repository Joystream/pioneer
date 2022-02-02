export interface OverviewSidebarRole {
  role: string
  reward: number
  isLead: boolean
}

type VoteType = 'rejected' | 'approved'

export interface OverviewSidebarProposal {
  title: string
  status: string
  votes: VoteType[]
}

export interface OverviewSidebarThread {
  title: string
  numberOfPosts: number
}

export interface OverviewSidebarInformations {
  roles: OverviewSidebarRole[]
  applications: string[]
  candidatures: number[]
  proposals: OverviewSidebarProposal[]
  threads: OverviewSidebarThread[]
}
