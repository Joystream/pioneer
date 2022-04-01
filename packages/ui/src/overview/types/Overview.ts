import BN from 'bn.js'

export interface OverviewSidebarRole {
  role: string
  reward: BN
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

export interface OverviewSidebarCandidacy {
  id: string
  title: string
}

export interface OverviewSidebarInformations {
  roles: OverviewSidebarRole[]
  applications: OverviewSidebarApplication[]
  candidatures: OverviewSidebarCandidacy[]
  proposals: string[]
  threads: OverviewSidebarThread[]
  isCouncil: boolean
}
