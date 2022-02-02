export interface OverviewSidebarRole {
  role: string
  reward: number
  isLead: boolean
}

export interface OverviewSidebarProposal {
  title: string
  status: string
  votes: {
    rejected: number
    approved: number
  }
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
