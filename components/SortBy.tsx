import { IOption } from 'constants/interfaces'
import Select from './Select'

function SortBy({ options }: { options: IOption[] }) {
  return <Select options={options} type="white" />
}

export default SortBy
