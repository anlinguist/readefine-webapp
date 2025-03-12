// ReadefineTooltipDemo.tsx
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional styles
import image from '../assets/testicon.png';

type HoveredData = {
  original?: string;
  target?: string;
  definition?: string | false;
  type?: string;
  link?: string | false;
  // ... any other fields from your data object
};

interface ReadefineTooltipProps {
  hoveredData: HoveredData;
  readefineMode: "reading" | "learning";
}

/**
 * A sample React component that replicates your content script's tooltip.
 * You pass it the data you need; it renders the correct content.
 */
export function ReadefineTooltip(props: ReadefineTooltipProps) {
  const { hoveredData, readefineMode } = props;

  // Decide which text to show, based on the mode.
  const displayText =
    readefineMode === "reading" ? hoveredData.target : hoveredData.original;

  // Example definition presence logic:
  const definition = hoveredData.definition;
  const link = hoveredData.link;
  const hasDefinition = !!(definition && definition !== "false" && definition !== "undefined");

  // Build your content:
  const tooltipContent = (
    <>
        <div id="readefine-original-word">{hoveredData['original']}</div>
        <div id="rdfn-tooltip">
            <div id={hasDefinition ? "rdfn_def_visible" : "rdfn_def"}>
                {hasDefinition && (
                <div id="rdfnDefAppearance" className="readefine-definition-visible">
                    {definition}
                </div>
                )}
                {/* Additional controls/expand icons */}
                <div id="rdfn_expand_out" className="dict_class">&#xe5cf;</div>
                <div id="rdfn_expand_in" className="dict_class">&#xe5ce;</div>
            </div>
            {
                link &&
                <a id="rdfn_link_visible" href={link} className="linkvisible" target="_blank">Learn more...</a>
            }
            <div className="readefine-tt-logo-container">
                <img className="readefine-tt-logo" src={image} alt="Readefine" />
                <div className="readefine-tt-fb">
                    <span id="readefine_settings" className="dict_class">&#xe8b8;</span>
                </div>
            </div>
        </div>
    </>
  );

  // Render the Tippy.js tooltip component
  return (
    <Tippy
        key={hoveredData.target}
      content={tooltipContent}
      allowHTML={true}
      interactive={true}
      animation="shift-away"
      theme="readefine"
      appendTo={document.body}
      hideOnClick={false}
    >
      <span className="readefiningAWord" style={{ cursor: "pointer" }}>
        {displayText}
      </span>
    </Tippy>
  );
}