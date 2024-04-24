export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface Campaign {
    information: {
        name: string
        describe?: string
    },
    subCampaigns: SubCampaign[]
}

export interface SubCampaign {
    name: string
    status: boolean
    ads: subAd[]
}

export interface subAd {
    name: string
    quantity: number
}