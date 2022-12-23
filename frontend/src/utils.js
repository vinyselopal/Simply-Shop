import { useSelector } from 'react-redux'

export const useSelectorWrapper = (prop) => {
  return useSelector(state => state[prop])
}
