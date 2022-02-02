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

export interface OverviewSidebarApplication {
  group: string
  expectedEndingDate: string
}

export interface OverviewSidebarInformations {
  roles: OverviewSidebarRole[]
  applications: OverviewSidebarApplication[]
  candidatures: number[]
  proposals: OverviewSidebarProposal[]
  threads: OverviewSidebarThread[]
}
