import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';

class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500,
      format: 'hex'
    };
  }
  changeLevel = level => {
    this.setState({ level });
  };
  changeFormat = format => {
    this.setState({ format });
  };
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const { format, level } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        color={color[format]}
        key={color.name}
        name={color.name}
        moreUrl={`/palette/${id}/${color.id}`}
        showLink={true}
        showFullPalette={true}
      />
    ));
    return (
      <div className={classes.palette}>
        <Navbar
          showLevelSlider={true}
          format={format}
          level={level}
          changeFormat={this.changeFormat}
          changeLevel={this.changeLevel}
        />
        <div className={classes.paletteColors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
