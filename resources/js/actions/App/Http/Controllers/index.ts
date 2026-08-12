import PatientsController from './PatientsController'
import ImagingOrdersController from './ImagingOrdersController'
import ReportsController from './ReportsController'
import Settings from './Settings'

const Controllers = {
    PatientsController: Object.assign(PatientsController, PatientsController),
    ImagingOrdersController: Object.assign(ImagingOrdersController, ImagingOrdersController),
    ReportsController: Object.assign(ReportsController, ReportsController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers