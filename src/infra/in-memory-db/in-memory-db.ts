interface SectorDAO {
    _id: number
    sectorName: string
    sectorSearchId: string
}

interface SubSectorDAO {
    _id: number
    subSectorName: string
    subSectorSearchId: string
}

interface SegmentDAO {
    _id: number
    segmentName: string
    segmentSearchId: string
}


export class InMemoryDB {

    private readonly sectors: SectorDAO[] = [
        {
            _id: 1,
            sectorName: "Consumo Cíclico",
            sectorSearchId: "2"
        }
    ]

    private readonly subSectors: SubSectorDAO[] = [
        {
            _id: 1,
            subSectorName: "Tecidos. Vestuário e Calçados",
            subSectorSearchId: "13"
        }
    ]

    private readonly segments: SubSectorDAO[] = [

    ]

    
    getSectorById(id: number) {
        return this.sectors.find((sector) => sector._id === id);
    }

    getSubSectorById(id: number) {
        return this.subSectors.find((subSector) => subSector._id === id);
    }

    getSegmentById(id: number) {
        return this.segments.find((segment) => segment._id === id);
    }
}