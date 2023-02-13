import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class TravelGuide extends Component {
  state = {status: apiStatus.progress, guideList: []}

  componentDidMount() {
    this.getGuide()
  }

  getGuide = async () => {
    const api = `https://apis.ccbp.in/tg/packages`
    const options = {
      method: 'GET',
    }

    const response = await fetch(api, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({guideList: updateData, status: apiStatus.success})
    }
  }

  renderSuccess = () => {
    const {guideList} = this.state
    const Guide = props => {
      const {guideItem} = props
      const {id, name, imageUrl, description} = guideItem
      return (
        <li key={id}>
          <img src={imageUrl} alt={name} />
          <h1>{name}</h1>
          <p>{description}</p>
        </li>
      )
    }
    return (
      <ul>
        {guideList.map(each => (
          <Guide key={each.id} guideItem={each} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravel = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderSuccess()
      case apiStatus.progress:
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    const {guideList} = this.state
    console.log(guideList)
    return (
      <div className="bg-container">
        <h1>Travel Guide</h1>
        <hr />

        {this.renderTravel()}
      </div>
    )
  }
}

export default TravelGuide
