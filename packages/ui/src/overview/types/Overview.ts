export interface OverviewSidebarRole {
  role: string
  reward: number
  isLead: boolean
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
  proposals: string[]
  threads: OverviewSidebarThread[]
  isCouncil: boolean
}
